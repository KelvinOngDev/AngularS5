namespace Pertemuan7.Models;
public class Telephone
{
    public int Id { get; set; }
    public string Nama { get; set; } = string.Empty;
    public string Alamat { get; set; } = string.Empty;
    public string NoTelp { get; set; } = string.Empty;
    public string KodePost { get; set; } = string.Empty;
    public DateTime? DataTime { get; set; }
}

public class TelephoneRequest
{
    public string Nama { get; set; } = string.Empty;
    public string Alamat { get; set; } = string.Empty;
    public string NoTelp { get; set; } = string.Empty;
    public string KodePost { get; set; } = string.Empty;
}