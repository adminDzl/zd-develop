$(function () {
    showAd();
});

// show products ad
function showAd() {
    $.ajax({
        // url:'http://localhost:3016/adata/list',
        url: 'http://localhost:8080/cms/addata/list',
        type: 'get',
        dataType: 'json',
        data: {},
        success: function (data) {
            var length = data.data.page.rows.length;
            var productDiv = $("#product-list");
            productDiv.html("");
            for (var i = 0; i < length; i++) {
                var html = ' <div class="isotope-item  newproducts discount">' +
                    '<div class="product-item hvr-underline-from-center">' +
                    '<div class="product-item_body">' +
                    '<img class="product-item_image" src="' + data.data.page.rows[i].adImgUrl + '" alt="Product">' +
                    '<a class="product-item_link" href="product-details.html">' +
                    '<span class="product-item_sale color-main font-additional customBgColor circle">-15%</span>' +
                    '</a>' +
                    '<div class="product-sidebar">' +
                    '<a href="#" class="buy">' +
                    '<span>BUY ITEM</span>' +
                    '</a>' +
                    '' +
                    '<a href="product-details.html" class="info">' +
                    '<span>QUICK VIEW</span>' +
                    '</a>' +
                    '' +
                    '<a href="#" class="favorites">' +
                    '<span>ADD TO FAVORITE</span>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '<a href="product-details.html" class="product-item_footer">' +
                    '<div class="product-item_title font-additional font-weight-bold text-center text-uppercase">' +
                    '' + data.data.page.rows[i].adShortTitle + '' +
                    '</div>' +
                    '<div class="product-item_price font-additional font-weight-normal customColor">' +
                    '$240.00 <span>$265.00</span></div>' +
                    '</a>' +
                    '</div>' +
                    '</div>';
                productDiv.append(html);
            }
            // resolve height
            var heightParam = length / 4;
            productDiv.css("height",heightParam * 463 + "px");
            // productDiv.attr("height",heightParam * 463 + "px");

        }, error: function () {
            alert("error");
        }

    });
}
function exit(){
    layer.confirm('Are you sure？',function(){
       location.href="http://www.zhidevelop.com/login.html";
    });
}