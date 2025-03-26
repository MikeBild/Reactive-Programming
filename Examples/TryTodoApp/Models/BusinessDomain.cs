using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Threading.Tasks;

namespace TryTodoApp.Models
{
    public class BusinessDomain : IBusinessDomain
    {
        private readonly Dictionary<int, Item> cache = [];
        private readonly Subject<Item> changes = new();

        public IObservable<Item> ChangedStream()
        {
            return changes;
        }

        public BusinessDomain()
        {
            var rnd = new Random();

            Observable
                .Interval(TimeSpan.FromSeconds(60))
                .Do((tick) =>
                {
                    var key = rnd.Next(1000, 100000);
                    Add(new Item() { Key = key, Content = new { Title = $"Foo {key}" } });
                })
                .Subscribe();
        }

        private Task<IEnumerable<Item>> FetchDataAsync()
        {
            //update cache

            //result
            return Task.FromResult(cache.Values.AsEnumerable());
        }

        public IObservable<IEnumerable<Item>> FromCache()
        {
            return Observable.FromAsync(() => FetchDataAsync());
        }

        public void Add(Item itm)
        {
            cache.Add(itm.Key, itm);
            changes.OnNext(itm);
        }
    }
}