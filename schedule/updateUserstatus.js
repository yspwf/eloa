module.exports = (schedule) => {
    const  scheduleCronstyle = ()=>{
        //每分钟的第30秒定时执行一次:
          schedule.scheduleJob('30 * * * * *',()=>{
              console.log('scheduleCronstyle:' + new Date());
          }); 
      }
      
    scheduleCronstyle();

}