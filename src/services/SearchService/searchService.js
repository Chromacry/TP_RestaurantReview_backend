const { STATUS_CODES } = require("../../constants/GlobalContants");

const search = (req, res) => {
  const query = req.body.query;
  const keys = req.body.keys;
  const data = req.body.data;
  
  const search = (data) => {
    return data.filter((item) => {
        const filterData = keys.some((key) => {
          if (item[key] === undefined) return;
          // res.json({
          //   message: "Key can't be found in data :",
          //   status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
          //   data: data
          // });;
          if (item[key].toLowerCase().includes(query.toLowerCase())) return item[key].toLowerCase().includes(query.toLowerCase());
    });
    // console.log(filterData); 
        if (filterData) return item;
    });
  }
  // console.log(search(data));
  res.json({
    message: "Successfully searched for :"+ query,
    status: STATUS_CODES.SUCCESS_CODE,
    data: search(data)
  });
  
};

module.exports = {search};