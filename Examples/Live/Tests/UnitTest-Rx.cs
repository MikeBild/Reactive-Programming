using System.Reactive.Linq;
using Microsoft.Reactive.Testing;

namespace Live.Tests
{
    public class UnitTest_Rx : ReactiveTest
    {
        [Fact]
        public void Test1()
        {
            // Arrange
            var scheduler = new TestScheduler(); // Scheduler to control time
            var stream = Observable.Timer(TimeSpan.FromSeconds(1), scheduler); // Wait for one second
            var observer = scheduler.CreateObserver<long>(); // Catches event(s) in the stream

            // Act
            stream.Subscribe(observer);
            scheduler.AdvanceBy(TimeSpan.FromSeconds(1).Ticks); // Time-Travel-Simulation (moves time forward)

            // Assert
            Assert.Equal(2, observer.Messages.Count);
            Assert.Equal(OnNext<long>(10000000, 0), observer.Messages.First()); // 1s = 10 Mio ticks
            Assert.Equal(OnCompleted<long>(10000000), observer.Messages.Skip(1).Take(1).First());
        }

        [Fact]
        public void Test2()
        {
            // Arrange
            var values = new[] { 1, 2, 3, 4, 5 };
            var result = new List<int>();

            var stream = values
                .ToObservable()
                .Where(x => x % 2 == 0);

            // Act
            stream.Subscribe(x => result.Add(x));

            // Assert
            Assert.Equal(new[] { 2, 4 }, result);
        }

        [Fact]
        public void Test3()
        {
            var input = new[] { 1, 2 };
            var output = new List<string>();

            var stream = input
                .ToObservable()
                .SelectMany(x => Observable.Return($"Data{x}"));

            stream.Subscribe(output.Add);

            Assert.Equal(new[] { "Data1", "Data2" }, output);
        }
    }
}