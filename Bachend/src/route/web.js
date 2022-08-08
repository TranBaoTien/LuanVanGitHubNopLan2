import express from "express";
import homeController from "../controllers/homeController";
import usercontroller from "../controllers/usercontroller";
import delevericontroller from "../controllers/delevericontroller";
import imagecontroller from "../controllers/imagecontroller";
import newcontroller from "../controllers/newcontroller";
import odercontroller from "../controllers/odercontroller";
import paymentcontroller from "../controllers/paymentcontroller";
import pricecontroller from "../controllers/pricecontroller";
import productcontroller from "../controllers/productcontroller";
import productreviewcontroller from "../controllers/productreviewcontroller";
import statuscontroller from "../controllers/statuscontroller";
import thuonghieucontroller from "../controllers/thuonghieucontroller";
import typeproductcontroller from "../controllers/typeproductcontroller";
import typeusercontroller from "../controllers/typeusercontroller";
import vouchercontroller from "../controllers/vouchercontroller";
import admincontroller from "../controllers/admincontroller"
let router = express.Router();

let initWebRoutes = (app) => {
//Admi
router.post('/api/adlogin',admincontroller.handlelogin);
router.get('/get-allnhanvien', admincontroller.getAllNhanvien);
router.post('/post-createnhanvien', admincontroller.postcreateNhanvien);
router.post('/post-deletenhanvien', admincontroller.postdeleteUser);

    router.get('/', homeController.getHomePage);
    //from them
    router.get('/crud', homeController.getCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);

//USER Dang Nhap handlelogin postcreateNhanvien getAllNhanvien

router.post('/api/login',usercontroller.handlelogin);
//lay all  user
router.get('/get-alluser', homeController.getAllUSER);
router.get('/get-oneuser', homeController.getOneUSER);
//them user
    router.post('/post-createuser', homeController.postcreateUser);
//delete user
    router.post('/post-deleteuser', homeController.postdeleteUser);
//sua user
    router.put('/put-updateuser', homeController.putupdateUser);
    router.put('/put-updatepass', homeController.putupdatePass);
//lay user theo íd
router.get('/get-crud', homeController.getEditCRUD);


//DeLEVERY
        router.get('/get-alldeliveri', delevericontroller.getAllDelivery);
        router.post('/post-createdeliveri', delevericontroller.postcreateDelivery);
        router.post('/post-deletedeliveri', delevericontroller.postdeleteDelivery);
        router.put('/put-updatedeliveri', delevericontroller.putupdateDelivery);

//Image
        router.get('/get-allimg', imagecontroller.getAllImage);
        router.post('/post-createimg', imagecontroller.postcreateImage);
        router.post('/post-deleteimg', imagecontroller.postdeleteImage);
        router.put('/put-updateimg', imagecontroller.putupdateImage);
//News
        router.get('/get-allnew', newcontroller.getAllNews);
        router.post('/post-createnew', newcontroller.postcreateNews);
        router.post('/post-deletenew', newcontroller.postdeleteNews);
        router.put('/put-updatenew', newcontroller.putupdateNews);


//Oder

        router.get('/get-alloder', odercontroller.getAllOder);
        router.get('/get-alldetailoder', odercontroller.getAllDetailOder);
        router.post('/post-createoder', odercontroller.postcreateOder);
        router.post('/post-addoder', odercontroller.addOder);
        
//dang su dug addoder
        router.post('/post-deleteoder', odercontroller.postdeleteOder);
        router.put('/put-updateoder', odercontroller.putupdateOder);
        router.put('/put-huydon', odercontroller.puthuydon);

//Payment

        router.get('/get-allpayment', paymentcontroller.getAllPayment);
        router.post('/post-createpayment', paymentcontroller.postcreatePayment);
        router.post('/post-deletepayment', paymentcontroller.postdeletePayment);
        router.put('/put-updatepayment', paymentcontroller.putupdatePayment);

//Price
        router.get('/get-oneprice', pricecontroller.getOnePrice );
        router.get('/get-allprice', pricecontroller.getAllPrice );
        router.post('/post-createprice', pricecontroller.postcreatePrice );
        router.post('/post-deleteprice', pricecontroller.postdeletePrice );
        router.put('/put-updateprice', pricecontroller.putupdatePrice );

//product getmoinhat
        router.get('/get-moinhat', productcontroller.getmoinhat);
        router.get('/get-banchay', productcontroller.getpronhieunhat);
        router.get('/get-allproduct', productcontroller.getAllProduct);
        router.post('/post-createproduct', productcontroller.postcreateProduct);
        router.post('/post-deleteproduct', productcontroller.postdeleteProduct);
        router.put('/put-updateproduct', productcontroller.putupdateProduct);
        router.get('/get-oneproduct', productcontroller.getOneProduct);
        router.get('/get-allproduct1', productcontroller.getAllProduct1);
        router.get('/get-sreach', productcontroller.SearchProduct);
        router.get('/get-timkiem', productcontroller.timkiem);

//productreview
        router.get('/get-allproductreview', productreviewcontroller.getAllProductreview );
        router.post('/post-createproductreview', productreviewcontroller.postcreateProductreview );
        router.post('/post-deleteproductreview', productreviewcontroller.postdeleteProductreview );
        router.put('/put-updateproductreview', productreviewcontroller.putupdateProductreview );

//status
        router.get('/get-allstatus', statuscontroller.getAllStatus  );
        router.post('/post-createstatus', statuscontroller.postcreateStatus  );
        router.post('/post-deletestatus', statuscontroller.postdeleteStatus  );
        router.put('/put-updatestatus', statuscontroller.putupdateStatus  );
        router.get('/get-onestatus', statuscontroller.getOneStatus  );


//thuonghieu
        router.get('/get-allthuonghieu', thuonghieucontroller.getAllThuonghieu);
        router.post('/post-createthuonghieu', thuonghieucontroller.postcreateThuonghieu);
        router.post('/post-deletethuonghieu', thuonghieucontroller.postdeleteThuonghieu);
        router.put('/put-updatethuonghieu', thuonghieucontroller.putupdateThuonghieu);

//typeproduct
        router.get('/get-alltypeproduct', typeproductcontroller.getAllTypeproduct);
        router.post('/post-createtypeproduct', typeproductcontroller.postcreateTypeproduct);
        router.post('/post-deletetypeproduct', typeproductcontroller.postdeleteTypeproduct);
        router.put('/put-updatetypeproduct', typeproductcontroller.putupdateTypeproduct);

//typeuser
        router.get('/get-alltypeuser', typeusercontroller.getAllTypeuser);
        router.post('/post-createtypeuser', typeusercontroller.postcreateTypeuser);
        router.post('/post-deletetypeuser', typeusercontroller.postdeleteTypeuser);
        router.put('/put-updatetypeuser', typeusercontroller.putupdateTypeuser);

//voucher
        router.get('/get-allvoucher', vouchercontroller.getAllVoucher);
        router.post('/post-createvoucher', vouchercontroller.postcreateVoucher);
        router.post('/post-deletevoucher', vouchercontroller.postdeleteVoucher);
        router.put('/put-updatevoucher', vouchercontroller.putupdateVoucher);


    return app.use("/", router);
}

module.exports = initWebRoutes;