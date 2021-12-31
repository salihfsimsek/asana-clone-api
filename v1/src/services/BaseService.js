class BaseService {
    async list(where) {
        return this.model.find(where || {})
    }

    async create(data) {
        return this.model.create(data)
    }

    async read(where) {

    }

    async update(id, data) {
        return this.model.findOneAndUpdate({ _id: id }, data, { new: true })
    }

    async delete(item) {
        return this.model.deleteOne(item)
    }
}

module.exports = BaseService