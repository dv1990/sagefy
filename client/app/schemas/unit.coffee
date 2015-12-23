{required} = require('../modules/validations')


module.exports = {
    language: {
        type: 'select'
        validations: [required]
        options: [
            {value: 'en'}
        ]
    }
    name: {
        type: 'text'
        validations: [required]
    }
    body: {
        type: 'textarea'
        validations: [required]
    }
    tags: {
        type: 'select'
        validations: []
    }
    require_ids: {
        type: 'select'
        validations: []
    }
}
