// #include <C:\Program Files\Mono\include\mono-2.0\mono\jit\jit.h>
// #include <C:\Program Files\Mono\include\mono-2.0\mono\metadata\assembly.h>
// #include <C:\Program Files\Mono\include\mono-2.0\mono\metadata\class.h>
// #include <C:\Program Files\Mono\include\mono-2.0\mono\metadata\debug-helpers.h>
// #include <C:\Program Files\Mono\include\mono-2.0\mono\metadata\mono-config.h>
#include <mono/jit/jit.h>
#include <mono/metadata/assembly.h>
#include <mono/metadata/class.h>
#include <mono/metadata/debug-helpers.h>
#include <mono/metadata/mono-config.h>
MonoDomain *domain;
int main(){
    const char* binary_path = "./1.dll";
    domain = mono_jit_init(binary_path);

    MonoAssembly* asmbly = mono_domain_assembly_open(domain,binary_path);
    MonoImage* mimage = mono_assembly_get_image(asmbly);
    MonoClass* mclass = mono_class_from_name(mimage,"TestLib","Test");
    MonoMethodDesc* desc = mono_method_desc_new("TestLib.Test:T()",true);
    MonoMethod* mtd = mono_method_desc_search_in_class(desc,mclass);
    mono_method_desc_free(desc);
    mono_runtime_invoke(mtd,NULL,NULL,NULL);
    mono_jit_cleanup(domain);
    return 0;
}