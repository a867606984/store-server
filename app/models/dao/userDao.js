/*
 * @Description: 用户模块数据持久层
 * @Author: hai-27
 * @Date: 2020-02-07 16:51:56
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 02:12:30
 */
const db = require('./db');

module.exports = {

  // 连接数据库根据用户名和密码查询用户信息
  Login: async (userName, password) => {
    const sql = '';
    return await db.query(sql, [userName, password]);
  },
  // 连接数据库根据用户名查询用户信息
  FindUserName: async (login_name) => {
    return await db.customerLogin.findAll({
      where: {
        login_name
      }
    });
  },
  // 连接数据库根据id查询用户信息
  FindUserInfoById: async (customer_id) => {
    let info = await db.customer_inf.findOne({
      where: {
        customer_id
      }
    });

    return info
  },
  // 连接数据库根据id查询用户信息
  FindUserNameById: async (customer_id) => {
    let { login_name } = await db.customerLogin.findOne({
      where: {
        customer_id
      }
    });
    
    return login_name
  },
  // 连接数据库插入用户信息
  Register: async (login_name, password) => {
    let t = await db.sequelize.transaction()
    try {
      let { customer_id } = await db.customerLogin.create({
        login_name,
        password
      }, { transaction: t})

      await db.customer_inf.create({
        customer_id,
        register_time: new Date()
      }, { transaction: t})
      
      await t.commit();

      return true
    } catch (error) {
      console.log(error)
      t.rollback();
    }
  },
  //连接数据库查询用户的地址列表
  GetUserAddress: async (customer_id) => {
    
  },
}