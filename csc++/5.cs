using UnityEngine;
public class Test{
    public static void Tt(){
        Vector3 x1 = Vector3.up;
        Vector3 x2 = Vector3.right;
        Vector3 x3 = new Vector3(0,1,0);
        Vector3 x4 = new Vector3(1,0,0);

        Console.WriteLine($"x1*x2 = {Vector3.Cross(x1,x2)}");
        Console.WriteLine($"x3*x4 = {Vector3.Cross(x3,x4)}");
        Console.WriteLine($"x3*x4 = {Vector3.Cross(x4,x3)}");
    }
}
Test.Tt();
// csharp 5.cs -r:"D:\unity4.5\Unity\Editor\Data\Managed\UnityEngine\UnityEngine.dll","D:\unity4.5\Unity\Editor\Data\Managed\UnityEngine\UnityEngine.CoreModule.dll"
// csharp 5.cs -r:"UnityEngine.CoreModule.dll","UnityEngine.AIModule.dll" -lib:"D:\unity4.5\Unity\Editor\Data\Managed\UnityEngine"
// csharp 5.cs -r:"UnityEngine.dll","UnityEngine.CoreModule.dll" -lib:"D:\unity4.5\Unity\Editor\Data\Managed\UnityEngine"
// csharp 5.cs -lib:"D:\unity4.5\Unity\Editor\Data\Managed\UnityEngine"
// csharp 5.cs -lib:"D:/unity4.5/Unity/Editor/Data/Managed/UnityEngine"