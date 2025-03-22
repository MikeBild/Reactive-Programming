namespace Live.Tests
{
    public class UnitTest_Tests
    {
        [Fact]
        public void Test1()
        {
            // Arrange
            var calc = new Demos.Tests();

            // Act
            var result = calc.Add(2, 3);

            // Assert
            Assert.Equal(5, result);
        }

        [Theory]
        [InlineData(1, 2, 3)]
        [InlineData(5, 5, 10)]
        public void Test2(int a, int b, int expected)
        {
            var calc = new Demos.Tests();
            var result = calc.Add(a, b);
            Assert.Equal(expected, result);
        }
    }
}
