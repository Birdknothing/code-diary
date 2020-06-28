using System;
using System.Linq;
using System.Collections.Generic;
using T2;
namespace TestLib{
    public static class Test{
        public static List<string> lis = new List<string> {"a","b","cd"};
        public static void T(){
            Console.WriteLine("hello world");
        }
        public static void Main(string[] args){
            object m = 1;
            print(m.ToString());
            Console.WriteLine("Main test");
            string tmp = lis.FirstOrDefault(ele => ele.Length == 2);
            print(tmp);
            Console.ReadLine();
        }
        public static void print(string msg){
            Tmp.pt();
            Console.WriteLine(msg);
        }
    }
}
