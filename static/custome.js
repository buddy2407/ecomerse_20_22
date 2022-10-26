$(document).ready(function () {
    $('#loadmore').on('click',function () {
            var _curentProducts = $('.product-box').length;
            var _limit=$(this).attr('data-limit');
            var _total=$(this).attr('data-total');
            console.log(_curentProducts,_limit,_total)
    //    start ajax
            $.ajax({
                url : '/loadmode_data',
                data : {
                    'limit':_limit,
                    'offset':_curentProducts,
                    'total':_total
                },
                dataType : 'json',
                beforeSend : function () {
                    $('#loadmore').attr('disabled',true);
                    $('.load-more-icon').addClass('fa-spin');
                },
                success : function (res) {
                    console.log(res.data)
                    $('#filteredproducts').append(res.data);
                    $('#loadmore').attr('disabled',false);
                    $(".load-more-icon").removeClass('fa-spin');
                    // remove the loadmore button
                    var _totalshowing = $('.product-box').length;
                    if ( _totalshowing==_total){
                        $('#loadmore').remove()
                    }
                }
            });
    // end ajax
    });

    // product variation price based on color and wuantity
    $('.choose-size').hide();
    //    end


//    show sizes according selecting colors
    $('.choose-color').on('click',function () {
        $('.choose-size').removeClass('active');
        $('.choose-color').removeClass('focused');
        $(this).addClass('focused');

        var _color = $(this).attr('data-color');
        // console.log(_color)
        $('.choose-size').hide();
        $('.color'+_color).show();
        $('.color'+_color).first().addClass('active')
        var _price = $('.color'+_color).first().attr('data-price');
          $('.product-price').text(_price)
    });
//    end


// show the first selected color first selected size
    $(".choose-color").first().addClass('focused');
    var _color = $('.choose-color').first().attr('data-color');
    var _price = $('.choose-size').first().attr('data-price');
    $('.color'+_color).show();
    $('.color'+_color).first().addClass('active');
    // $(".product-price").text(_price);

    //    end

//    show the price according the selected size
    $('.choose-size').on('click',function () {
        var _price = $(this).attr('data-price');
        $('.choose-size').removeClass('active');
        $(this).addClass('active')
        console.log(_price)
        $('.product-price').text(_price)
    });
//    end

//    add to cart functionality
        $('#addToCart').on('click',function () {
            var _vm=$(this);
            var _qty = $('#product-qty').val();
            var _productid = $('.product-id').val();
            var _producttitle = $('.product-title').val();
            var _productprice = $('.product-price').text();
            // console.log(_qty,_productid,_producttitle,_productprice)
        //    ajax
            $.ajax({
                url : '/add_to_cart',
                data : {
                    'id':_productid,
                    'qty': _qty,
                    'title':_producttitle,
                    'price':_productprice
                },
                dataType: 'json',
                beforeSend:function () {
                    _vm.attr('disabled',true)
                },
                success:function (res) {
                    console.log(res)
                    $('.cart-list').text(res.totalitems)
                    _vm.attr('disabled',false)
                }
            });
        //    end
        });
//    end

});