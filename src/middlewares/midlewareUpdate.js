function validateUpdate(req, res, next) {
    const { id, forma_pagamento, status_pagamento } = req.body

        if (!id)               return res.status(400).json({ erro: "id do pedido obrigatório" })
    if (!forma_pagamento)  return res.status(400).json({ erro: "forma_pagamento obrigatória" })
if (!status_pagamento) return res.status(400).json({ erro: "status_pagamento obrigatório" })

  next()
}

export default validateUpdate