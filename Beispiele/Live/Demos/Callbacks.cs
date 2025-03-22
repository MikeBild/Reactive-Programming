using System.Reactive.Linq;

namespace Live.Demos
{
    public static class Callbacks
    {
        public static IObservable<string> Callback()
        {
            return Observable.Create<string>(observer =>
          {
              DownloadData(result =>
              {
                  observer.OnNext(result);
                  observer.OnCompleted();
              });
              return () => { }; // Disposable implementation
          });
        }
        public static void DownloadData(Action<string> callback)
        {
            Task.Run(() =>
            {
                Thread.Sleep(10000);
                callback("Download complete!");
            });
        }
    }
}