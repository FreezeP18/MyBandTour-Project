
CREATE TABLE Bandas (
    BandaID INT PRIMARY KEY IDENTITY(1,1),
    Nombre VARCHAR(100) NOT NULL,
    GeneroMusical VARCHAR(50) NOT NULL
);

INSERT INTO Bandas (Nombre, GeneroMusical)
VALUES 
    ('Minami', 'JPop'),
    ('BTS', 'K-Pop'),
    ('Yoasobi', 'JPop');
---------------------------------------------------------
CREATE TABLE Conciertos (
    ConciertoID INT PRIMARY KEY IDENTITY(1,1),
    BandaID INT NOT NULL,
    FechaConcierto VARCHAR(10) NOT NULL,
    HoraConcierto VARCHAR(5) NOT NULL,
    Pais VARCHAR(50) NOT NULL,
    Direccion VARCHAR(255) NOT NULL,
    FOREIGN KEY (BandaID) REFERENCES Bandas(BandaID)
);
------------------------------------------------------------
CREATE PROCEDURE sp_VerConciertos
AS
BEGIN
    SELECT 
        c.ConciertoID,
        b.Nombre AS Banda,
        b.GeneroMusical,
        c.FechaConcierto,
        c.HoraConcierto,
        c.Pais,
        c.Direccion
    FROM Conciertos c
    INNER JOIN Bandas b ON c.BandaID = b.BandaID;
END;
------------------------------------------------------------
CREATE PROCEDURE sp_CrearConcierto
    @BandaID INT,
    @FechaConcierto VARCHAR(10),
    @HoraConcierto VARCHAR(5),
    @Pais VARCHAR(50),
    @Direccion VARCHAR(255)
AS
BEGIN
    INSERT INTO Conciertos (BandaID, FechaConcierto, HoraConcierto, Pais, Direccion)
    VALUES (@BandaID, @FechaConcierto, @HoraConcierto, @Pais, @Direccion);
END;
--------------------------------------------------------------------
CREATE PROCEDURE sp_EliminarConcierto
    @ConciertoID INT
AS
BEGIN
    DELETE FROM Conciertos
    WHERE ConciertoID = @ConciertoID;
END;
---------------------------------------------------------------

