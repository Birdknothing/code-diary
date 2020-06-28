
// Metadata version: v4.0.30319
.assembly extern mscorlib
{
  .publickeytoken = (B7 7A 5C 56 19 34 E0 89 )                         // .z\V.4..
  .ver 4:0:0:0
}
.assembly '4'
{
  .custom instance void [mscorlib]System.Runtime.CompilerServices.RuntimeCompatibilityAttribute::.ctor() = ( 01 00 01 00 54 02 16 57 72 61 70 4E 6F 6E 45 78   // ....T..WrapNonEx
                                                                                                             63 65 70 74 69 6F 6E 54 68 72 6F 77 73 01 )       // ceptionThrows.
  .hash algorithm 0x00008004
  .ver 0:0:0:0
}
.module '4.exe'
// MVID: {D925E00D-44AE-4371-B7F5-85FA460A5437}
.imagebase 0x00400000
.file alignment 0x00000200
.stackreserve 0x00100000
.subsystem 0x0003       // WINDOWS_CUI
.corflags 0x00000001    //  ILONLY


// =============== CLASS MEMBERS DECLARATION ===================

.class public abstract auto ansi sealed beforefieldinit TestLib.Test
       extends [mscorlib]System.Object
{
  .field public static int32[] lis
  .method public hidebysig static void  T() cil managed
  {
    // Code size       11 (0xb)
    .maxstack  8
    IL_0000:  ldstr      "hello world"
    IL_0005:  call       void [mscorlib]System.Console::WriteLine(string)
    IL_000a:  ret
  } // end of method Test::T

  .method public hidebysig static void  T2<T>(!!T x) cil managed
  {
    // Code size       16 (0x10)
    .maxstack  8
    IL_0000:  ldtoken    !!T
    IL_0005:  call       [mscorlib]System.Type [mscorlib]System.Type::GetTypeFromHandle([mscorlib]System.RuntimeTypeHandle)
    IL_000a:  call       void [mscorlib]System.Console::WriteLine(object)
    IL_000f:  ret
  } // end of method Test::T2

  .method public hidebysig static void  Main() cil managed
  {
    .entrypoint
    // Code size       63 (0x3f)
    .maxstack  2
    .locals init (int32 V_0)
    IL_0000:  ldstr      "23"
    IL_0005:  call       void TestLib.Test::T2<string>(!!0)
    IL_000a:  ldstr      "Main test"
    IL_000f:  call       void [mscorlib]System.Console::WriteLine(string)
    IL_0014:  ldc.i4.0
    IL_0015:  stloc.0
    IL_0016:  br         IL_002b

    IL_001b:  ldsfld     int32[] TestLib.Test::lis
    IL_0020:  ldloc.0
    IL_0021:  ldelem.i4
    IL_0022:  call       void [mscorlib]System.Console::WriteLine(int32)
    IL_0027:  ldloc.0
    IL_0028:  ldc.i4.1
    IL_0029:  add
    IL_002a:  stloc.0
    IL_002b:  ldloc.0
    IL_002c:  ldsfld     int32[] TestLib.Test::lis
    IL_0031:  ldlen
    IL_0032:  conv.i4
    IL_0033:  blt        IL_001b

    IL_0038:  call       string [mscorlib]System.Console::ReadLine()
    IL_003d:  pop
    IL_003e:  ret
  } // end of method Test::Main

  .method public hidebysig static void  print(string msg) cil managed
  {
    // Code size       7 (0x7)
    .maxstack  8
    IL_0000:  ldarg.0
    IL_0001:  call       void [mscorlib]System.Console::WriteLine(string)
    IL_0006:  ret
  } // end of method Test::print

  .method private hidebysig specialname rtspecialname static 
          void  .cctor() cil managed
  {
    // Code size       23 (0x17)
    .maxstack  8
    IL_0000:  ldc.i4.3
    IL_0001:  newarr     [mscorlib]System.Int32
    IL_0006:  dup
    IL_0007:  ldtoken    field valuetype '<PrivateImplementationDetails>'/'$ArrayType=12' '<PrivateImplementationDetails>'::'$field-E429CCA3F703A39CC5954A6572FEC9086135B34E'
    IL_000c:  call       void [mscorlib]System.Runtime.CompilerServices.RuntimeHelpers::InitializeArray([mscorlib]System.Array,
                                                                                                        [mscorlib]System.RuntimeFieldHandle)
    IL_0011:  stsfld     int32[] TestLib.Test::lis
    IL_0016:  ret
  } // end of method Test::.cctor

} // end of class TestLib.Test

.class private abstract auto ansi sealed beforefieldinit '<PrivateImplementationDetails>'
       extends [mscorlib]System.Object
{
  .custom instance void [mscorlib]System.Runtime.CompilerServices.CompilerGeneratedAttribute::.ctor() = ( 01 00 00 00 ) 
  .class sequential ansi sealed nested private beforefieldinit '$ArrayType=12'
         extends [mscorlib]System.ValueType
  {
    .pack 1
    .size 12
  } // end of class '$ArrayType=12'

  .field static assembly initonly valuetype '<PrivateImplementationDetails>'/'$ArrayType=12' '$field-E429CCA3F703A39CC5954A6572FEC9086135B34E' at D_00004000
} // end of class '<PrivateImplementationDetails>'


// =============================================================

.data D_00004000 = bytearray (
                 01 00 00 00 02 00 00 00 03 00 00 00) 
// *********** DISASSEMBLY COMPLETE ***********************
