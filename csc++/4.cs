using System;
using System.Linq;
using System.Collections.Generic;
namespace TestLib{
    public static class Test{
        public static int[] lis  = new int[3] {1,2,3};

        // static List<string> m = new List<string>() {"100","300"};

        public static void T(){
            Console.WriteLine("hello world");
        }
        public static void T2<T>(T x){
            Console.WriteLine(typeof(T));
        }
        public static void Main(){
            // m.Add("400");
            // print(m[2]);

            T2("23");

            Console.WriteLine("Main test");

            for(int i = 0;i<lis.Length;i++){
                Console.WriteLine(lis[i]);
            }
            Console.ReadLine();
        }
        public static void print(string msg){
            Console.WriteLine(msg);
        }
    }
}
