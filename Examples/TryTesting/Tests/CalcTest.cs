namespace TryTesting.Tests;

public class CalcTest
{
    [Fact]
    public void Add_1_and_2_should_return_3()
    {
        // Arrange
        // Act
        var actual = Calc.Add(1, 2);

        // Assert
        Assert.Equal(3, actual);
    }

    [Theory]
    [InlineData(1, 2, 3)]
    [InlineData(5, 5, 10)]
    public void Add_DataDriven(int a, int b, int expected)
    {
        // Arrange
        // Act
        var actual = Calc.Add(a, b);

        // Assert
        Assert.Equal(expected, actual);
    }
}
