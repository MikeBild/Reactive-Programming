namespace Mike.Tests;

public class CalcTests
{
    [Fact]
    public void AddTest1()
    {
        //Arrange
        var sut = new Mike.Demos.Calc();

        //Act
        var actual = sut.Add(1, 1);

        //Assert
        Assert.Equal(2, actual);
    }

    [Theory]
    [InlineData(1, 2, 3)]
    [InlineData(5, 5, 10)]    
    public void AddTest2(int a, int b, int expected)
    {
        //Arrange
        var sut = new Demos.Calc();

        //Act
        var actual = sut.Add(a, b);

        //Assert
        Assert.Equal(expected, actual);
    }
}
