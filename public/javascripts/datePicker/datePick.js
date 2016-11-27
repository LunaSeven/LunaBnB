$(document).ready(function() {
    $('#date_check_in').bootstrapMaterialDatePicker({
        time: false,
        weekStart: 0
    });
    $('#date_check_out').bootstrapMaterialDatePicker({
        time: false,
        weekStart: 0
    });
    $('.btn_date').bootstrapMaterialDatePicker({
        time: false,
        weekStart: 0
    });

    $.material.init();
});
