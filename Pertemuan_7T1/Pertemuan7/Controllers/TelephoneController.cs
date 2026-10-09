using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using Pertemuan7.Models; 

namespace Pertemuan7.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TelephoneController(IConfiguration configuration) : ControllerBase
{
    private readonly string _connectionString =
        configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string 'DefaultConnection' tidak ditemukan.");

    // 1. GET ALL
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = new List<Telephone>();
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();
        
        string query = "SELECT id, nama, alamat, no_telp, kode_post, data_time FROM table_telephone";
        using var command = new MySqlCommand(query, connection);
        using var reader = await command.ExecuteReaderAsync();
        
        while (await reader.ReadAsync())
        {
            list.Add(new Telephone
            {
                Id = reader.GetInt32("id"),
                Nama = ReadString(reader, "nama"),
                Alamat = ReadString(reader, "alamat"),
                NoTelp = ReadString(reader, "no_telp"),
                KodePost = ReadString(reader, "kode_post"),
                DataTime = reader.IsDBNull(reader.GetOrdinal("data_time"))
                    ? null
                    : reader.GetDateTime("data_time")
            });
        }
        return Ok(list); 
    }

    // 2. GET BY ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();
        
        string query = "SELECT id, nama, alamat, no_telp, kode_post, data_time FROM table_telephone WHERE id = @id";
        using var command = new MySqlCommand(query, connection);
        command.Parameters.AddWithValue("@id", id);
        
        using var reader = await command.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            var data = new Telephone
            {
                Id = reader.GetInt32("id"),
                Nama = ReadString(reader, "nama"),
                Alamat = ReadString(reader, "alamat"),
                NoTelp = ReadString(reader, "no_telp"),
                KodePost = ReadString(reader, "kode_post"),
                DataTime = reader.IsDBNull(reader.GetOrdinal("data_time"))
                    ? null
                    : reader.GetDateTime("data_time")
            };
            return Ok(data);
        }
        return NotFound(new { message = $"Data dengan ID {id} tidak ditemukan." }); 
    }

    // 3. CREATE (POST)
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TelephoneRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Nama)
            || string.IsNullOrWhiteSpace(request.Alamat)
            || string.IsNullOrWhiteSpace(request.NoTelp)
            || string.IsNullOrWhiteSpace(request.KodePost))
        {
            return BadRequest(new { message = "Nama, alamat, nomor telepon, dan kode pos wajib diisi." });
        }

        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();
        
        string insertQuery = """
            INSERT INTO table_telephone (nama, alamat, no_telp, kode_post, data_time)
            VALUES (@nama, @alamat, @no_telp, @kode_post, NOW());
            SELECT LAST_INSERT_ID();
            """;
        using var command = new MySqlCommand(insertQuery, connection);
        command.Parameters.AddWithValue("@nama", request.Nama.Trim());
        command.Parameters.AddWithValue("@alamat", request.Alamat.Trim());
        command.Parameters.AddWithValue("@no_telp", request.NoTelp.Trim());
        command.Parameters.AddWithValue("@kode_post", request.KodePost.Trim());
        
        int newId = Convert.ToInt32(await command.ExecuteScalarAsync());
        
        string selectQuery = "SELECT id, nama, alamat, no_telp, kode_post, data_time FROM table_telephone WHERE id=@id";
        using var selectCommand = new MySqlCommand(selectQuery, connection);
        selectCommand.Parameters.AddWithValue("@id", newId);
        
        using var reader = await selectCommand.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            var createdData = new Telephone
            {
                Id = reader.GetInt32("id"),
                Nama = ReadString(reader, "nama"),
                Alamat = ReadString(reader, "alamat"),
                NoTelp = ReadString(reader, "no_telp"),
                KodePost = ReadString(reader, "kode_post"),
                DataTime = reader.IsDBNull(reader.GetOrdinal("data_time"))
                    ? null
                    : reader.GetDateTime("data_time")
            };
            return CreatedAtAction(nameof(GetById), new { id = newId }, createdData); 
        }
        return BadRequest("Gagal mengambil data setelah input.");
    }

    // 4. UPDATE (PUT)
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] TelephoneRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Nama)
            || string.IsNullOrWhiteSpace(request.Alamat)
            || string.IsNullOrWhiteSpace(request.NoTelp)
            || string.IsNullOrWhiteSpace(request.KodePost))
        {
            return BadRequest(new { message = "Nama, alamat, nomor telepon, dan kode pos wajib diisi." });
        }

        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();
        
        string updateQuery = """
            UPDATE table_telephone
            SET nama = @nama, alamat = @alamat, no_telp = @no_telp, kode_post = @kode_post
            WHERE id = @id
            """;
        using var command = new MySqlCommand(updateQuery, connection);
        command.Parameters.AddWithValue("@id", id);
        command.Parameters.AddWithValue("@nama", request.Nama.Trim());
        command.Parameters.AddWithValue("@alamat", request.Alamat.Trim());
        command.Parameters.AddWithValue("@no_telp", request.NoTelp.Trim());
        command.Parameters.AddWithValue("@kode_post", request.KodePost.Trim());
        
        int rowsAffected = await command.ExecuteNonQueryAsync();
        if (rowsAffected == 0)
        {
            string existsQuery = "SELECT EXISTS(SELECT 1 FROM table_telephone WHERE id = @id)";
            using var existsCommand = new MySqlCommand(existsQuery, connection);
            existsCommand.Parameters.AddWithValue("@id", id);
            if (Convert.ToInt32(await existsCommand.ExecuteScalarAsync()) == 0)
            {
                return NotFound(new { message = $"Data dengan ID {id} tidak ditemukan." });
            }
        }
        
        string selectQuery = "SELECT id, nama, alamat, no_telp, kode_post, data_time FROM table_telephone WHERE id=@id";
        using var selectCommand = new MySqlCommand(selectQuery, connection);
        selectCommand.Parameters.AddWithValue("@id", id);
        
        using var reader = await selectCommand.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            var updatedData = new Telephone
            {
                Id = reader.GetInt32("id"),
                Nama = ReadString(reader, "nama"),
                Alamat = ReadString(reader, "alamat"),
                NoTelp = ReadString(reader, "no_telp"),
                KodePost = ReadString(reader, "kode_post"),
                DataTime = reader.IsDBNull(reader.GetOrdinal("data_time"))
                    ? null
                    : reader.GetDateTime("data_time")
            };
            return Ok(updatedData);
        }
        return BadRequest("Gagal mengambil data setelah update.");
    }

    // 5. DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();
        
        string query = "DELETE FROM table_telephone WHERE id = @id";
        using var command = new MySqlCommand(query, connection);
        command.Parameters.AddWithValue("@id", id);
        
        int rowsAffected = await command.ExecuteNonQueryAsync();
        if (rowsAffected == 0)
        {
            return NotFound(new { message = $"Data dengan ID {id} tidak ditemukan." });
        }
        
        return Ok(new { message = $"Data ID {id} berhasil dihapus!" });
    }

    private static string ReadString(MySqlDataReader reader, string column)
    {
        return reader.IsDBNull(reader.GetOrdinal(column)) ? string.Empty : reader.GetString(column);
    }
}