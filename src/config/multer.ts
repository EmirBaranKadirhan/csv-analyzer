import multer from "multer"

const storage = multer.diskStorage({    // gecici hafiza(Ram) ya da harddiske kaydetme kismi. DiskStorage ile harddiske kaydetmis oluyoruz.
    destination: (req, file, cb) => {
        cb(null, "uploads/")      // cb parametreleri ==> ilk parametre(hata) varsa oraya dusecek, hata yoksa multer'in kullanacagi dosya adi veya yolunu buraya yazariz!
    },
    filename: (req, file, cb) => {  // dosya adi belirleme kismi, herkes ayni isimle dosya yuklememesi icin!
        const uniqueName = Date.now() + "-" + file.originalname
        cb(null, uniqueName)    // cb ==> multer'e haber verme amaci tasir
    }
})

const upload = multer({ storage })

export default upload