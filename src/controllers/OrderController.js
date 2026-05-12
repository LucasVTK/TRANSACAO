import PedidoRepository from "../repositories/PedidoRepository.js";

const OrderController = {
  async todos(req, res) {
    const rows = await PedidoRepository.getAll();
    res.status(200).json(rows);
  },
  async insert(req, res) {
    const model = req.body;
    const resp = await PedidoRepository.create(model);
    res.status(200).json(resp);
  },

  async edit(req, res){
    const model = req.body
    const resp = await PedidoRepository.update(model)
    res.status(200).json(resp)
  }
};

export default OrderController;
