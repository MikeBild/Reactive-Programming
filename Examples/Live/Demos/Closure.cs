
class Closure
{
    public Func<string, string> Foo(string b)
    {
        var uu = "dskjdsk";

        return (string a) =>
        {
            return a + b + uu;
        };
    }

    public string Bar()
    {
        var t = Foo("Bar");
        return t("Foo");
    }
}
