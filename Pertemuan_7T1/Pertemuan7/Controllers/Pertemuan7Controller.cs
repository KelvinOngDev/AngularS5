using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using Pertemuan7.Models;

namespace Pertemuan7.Controllers;

public class MahasiswaRequest
{
    public string Nama { get; set; } = string.Empty;
    public string Alamat { get; set; } = string.Empty;
    public string Pesanpesan { get; set; } = string.Empty;
    public DateTime? DateTime { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class Pertemuan7Controller(IConfiguration configuration) : ControllerBase
{
    private readonly string _connectionString =
        configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string 'DefaultConnection' tidak ditemukan.");

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Mahasiswa>>> GetAll()
    {
        const string query = """
            SELECT id, nama, alamat,
                pesan_pesan AS Pesanpesan,
                date_time AS DateTime
            FROM tabel_mahasiswa ORDER BY id;
            """;

        var mahasiswa = new List<Mahasiswa>();
        await using var connection = new MySqlConnection(_connectionString);

        try { await connection.OpenAsync(); }
        catch (MySqlException)
        {
            return StatusCode(
                StatusCodes.Status503ServiceUnavailable,
                new { message = "Database MySQL tidak dapat dihubungi. Pastikan MySQL aktif dan connection string benar." });
        }

        await using var command = new MySqlCommand(query, connection);
        await using var reader = await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
            mahasiswa.Add(MapMahasiswa(reader));

        return Ok(mahasiswa);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Mahasiswa>> GetById(int id)
    {
        const string query = """
            SELECT id, nama, alamat,
                pesan_pesan AS Pesanpesan,
                date_time AS DateTime
            FROM tabel_mahasiswa WHERE id = @Id;
            """;

        await using var connection = new MySqlConnection(_connectionString);
        try { await connection.OpenAsync(); }
        catch (MySqlException)
        {
            return StatusCode(
                StatusCodes.Status503ServiceUnavailable,
                new { message = "Database MySQL tidak dapat dihubungi. Pastikan MySQL aktif dan connection string benar." });
        }

        await using var command = new MySqlCommand(query, connection);
        command.Parameters.AddWithValue("@Id", id);
        await using var reader = await command.ExecuteReaderAsync();

        if (!await reader.ReadAsync())
            return NotFound();

        return Ok(MapMahasiswa(reader));
    }

    [HttpPost]
    public async Task<ActionResult<Mahasiswa>> Create([FromBody] MahasiswaRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Nama) || string.IsNullOrWhiteSpace(request.Alamat))
            return BadRequest(new { message = "Nama dan alamat wajib diisi." });

        const string query = """
            INSERT INTO tabel_mahasiswa (nama, alamat, pesan_pesan, date_time)
            VALUES (@Nama, @Alamat, @Pesanpesan, @DateTime);
            """;

        await using var connection = new MySqlConnection(_connectionString);
        try { await connection.OpenAsync(); }
        catch (MySqlException)
        {
            return StatusCode(
                StatusCodes.Status503ServiceUnavailable,
                new { message = "Database MySQL tidak dapat dihubungi. Pastikan MySQL aktif dan connection string benar." });
        }

        await using var command = new MySqlCommand(query, connection);
        AddRequestParameters(command, request);
        await command.ExecuteNonQueryAsync();

        var mahasiswa = new Mahasiswa
        {
            Id = checked((int)command.LastInsertedId),
            Nama = request.Nama.Trim(),
            Alamat = request.Alamat.Trim(),
            Pesanpesan = request.Pesanpesan.Trim(),
            DateTime = request.DateTime
        };

        return CreatedAtAction(nameof(GetById), new { id = mahasiswa.Id }, mahasiswa);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] MahasiswaRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Nama) || string.IsNullOrWhiteSpace(request.Alamat))
            return BadRequest(new { message = "Nama dan alamat wajib diisi." });

        const string query = """
            UPDATE tabel_mahasiswa
            SET nama = @Nama,
                alamat = @Alamat,
                pesan_pesan = @Pesanpesan,
                date_time = @DateTime
            WHERE id = @Id;
            """;

        await using var connection = new MySqlConnection(_connectionString);
        try { await connection.OpenAsync(); }
        catch (MySqlException)
        {
            return StatusCode(
                StatusCodes.Status503ServiceUnavailable,
                new { message = "Database MySQL tidak dapat dihubungi. Pastikan MySQL aktif dan connection string benar." });
        }

        await using var command = new MySqlCommand(query, connection);
        AddRequestParameters(command, request);
        command.Parameters.AddWithValue("@Id", id);
        var affectedRows = await command.ExecuteNonQueryAsync();

        if (affectedRows == 0)
        {
            const string existsQuery = "SELECT EXISTS(SELECT 1 FROM tabel_mahasiswa WHERE id = @Id);";
            await using var existsCommand = new MySqlCommand(existsQuery, connection);
            existsCommand.Parameters.AddWithValue("@Id", id);
            if (Convert.ToInt32(await existsCommand.ExecuteScalarAsync()) == 0)
                return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        const string query = "DELETE FROM tabel_mahasiswa WHERE id = @Id;";

        await using var connection = new MySqlConnection(_connectionString);
        try { await connection.OpenAsync(); }
        catch (MySqlException)
        {
            return StatusCode(
                StatusCodes.Status503ServiceUnavailable,
                new { message = "Database MySQL tidak dapat dihubungi. Pastikan MySQL aktif dan connection string benar." });
        }

        await using var command = new MySqlCommand(query, connection);
        command.Parameters.AddWithValue("@Id", id);
        if (await command.ExecuteNonQueryAsync() == 0)
            return NotFound();

        return NoContent();
    }

    private static void AddRequestParameters(MySqlCommand command, MahasiswaRequest request)
    {
        command.Parameters.AddWithValue("@Nama", request.Nama.Trim());
        command.Parameters.AddWithValue("@Alamat", request.Alamat.Trim());
        command.Parameters.AddWithValue("@Pesanpesan", request.Pesanpesan.Trim());
        command.Parameters.AddWithValue("@DateTime", (object?)request.DateTime ?? DBNull.Value);
    }

    private static Mahasiswa MapMahasiswa(MySqlDataReader reader)
    {
        return new Mahasiswa
        {
            Id = reader.GetInt32("id"),
            Nama = ReadString(reader, "nama"),
            Alamat = ReadString(reader, "alamat"),
            Pesanpesan = reader.IsDBNull(reader.GetOrdinal("Pesanpesan")) ? string.Empty : reader.GetString("Pesanpesan"),
            DateTime = reader.IsDBNull(reader.GetOrdinal("DateTime")) ? null : reader.GetDateTime("DateTime")
        };
    }

    private static string ReadString(MySqlDataReader reader, string column)
    {
        return reader.IsDBNull(reader.GetOrdinal(column)) ? string.Empty : reader.GetString(column);
    }
}