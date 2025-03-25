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
}
