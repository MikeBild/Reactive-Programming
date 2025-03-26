using System;
using System.Collections.Generic;

namespace TryTodoApp.Models
{
    public interface IBusinessDomain
    {
        void Add(Item itm);
        IObservable<Item> ChangedStream();
        IObservable<IEnumerable<Item>> FromCache();
    }
}