const crypto  = require('crypto');

const ApiKey = {
  generate: async (userId) => {
    const apiKey    = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 menit dari sekarang

    const [checkExistingKey] = await db.query('SELECT * FROM api_keys WHERE user_id = ?', [userId]);

    if (checkExistingKey.length > 0) {
        await db.query('DELETE FROM api_keys WHERE user_id = ?', [userId]);
    }

    const [insertData] = await db.query('INSERT INTO api_keys (user_id, api_key, expires_at) VALUES (?, ?, ?)', [userId, apiKey, expiresAt]);
    let dataReturn

    if (insertData.affectedRows > 0) {
        dataReturn = {
           success : true,
           data    : {
              api_key    : apiKey,
              expired_in : expiresAt
           }
        }
    } else {
      dataReturn = {
         success : false,
         message : 'failed'
      }
    }
    
    return dataReturn;
  },
  validate: async (apiKey) => {
    const [rows] = await db.query('SELECT * FROM api_keys WHERE api_key = ?', [apiKey]);
    return rows.length > 0 ? rows[0] : null;
  }
};

module.exports = ApiKey;