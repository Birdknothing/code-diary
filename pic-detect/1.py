
from PIL import Image
import pytesseract
 

text = pytesseract.image_to_string(Image.open(r'E:\code-diary-2019\pic-detect\1.jpg'))
print(text)
# 打开一个文件
fo = open("1.txt", "w")
fo.write(text+"\n")
 
# 关闭打开的文件
fo.close()