import {Form as VeeForm, Field as VeeField, defineRule,configure, ErrorMessage} from 'vee-validate';
import {required, min, max, email, min_value as minValue, confirmed, max_value as maxValue, alpha_spaces as alphaSpaces} from '@vee-validate/rules';

export default {
    install(app,options) {
        app.component('VeeForm', VeeForm);
        app.component('VeeField', VeeField);
        app.component('ErrorMessage', ErrorMessage)
        defineRule('required', required);
        defineRule('tos', required);
        defineRule('min', min);
        defineRule('max', max);
        defineRule('alpha_spaces', alphaSpaces);
        defineRule('email', email);
        defineRule('min_value', minValue);
        defineRule('max_value', maxValue);
        defineRule('confirmed', confirmed);

        configure({
            generateMessage: (ctx) => {
                const messages = {
                    required: `The field ${ctx.field} is required`,
                    min: `The field ${ctx.field} is too short`,
                    max: `The field ${ctx.field} is too long`,
                    alpha_spaces: `The field ${ctx.field} only carry alphabetic and spaces`,
                    email: `The field ${ctx.field} must be a valid email`,
                    min_value: `The field ${ctx.field} is too young`,
                    max_value: `The field ${ctx.field} is too high`,
                    confirmed: `The passwords do not match`,
                    tos: 'You must agree to the terms of service'
                }
                const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid`;

                return message
            },
            validateOnBlur: true,
            validateOnChange: true,
            validateOnInput: false,
            validateOnModelUpdate: true
        })        
    }
}