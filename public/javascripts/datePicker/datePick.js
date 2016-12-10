$(document).ready(function() {
  $('#date_check_in').change(function(){
    console.log('chekIn date');
    console.log($(this).val());
    if(moment().format('YYYY-MM-DD')>$(this).val()){
      alert('날짜를 다시 선택해 주세요.');
      $(this).val("");
    }

  });
  $('#date_check_out').change(function(){
    console.log('chekOut date');
    if(moment().format('YYYY-MM-DD')>$(this).val() || $('#date_check_in').val()>=$(this).val()){
      alert('날짜를 다시 선택해 주세요.');
      $(this).val("");
    }

  });
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


});
