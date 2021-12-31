class BaseService {
    async list(where) {
        return this.model.find(where || {})
    }

    async create(data) {
        return this.model.create(data)
    }

    async findOne(where) {
        return this.model.findOne({ where })
    }

    async update(item, data) {
        return this.model.findOneAndUpdate(item, data, { new: true })
    }

    async delete(item) {
        return this.model.deleteOne(item)
    }
}

module.exports = BaseService