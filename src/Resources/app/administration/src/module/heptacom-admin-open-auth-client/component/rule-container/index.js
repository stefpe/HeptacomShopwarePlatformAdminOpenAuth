import template from './rule-container.html.twig';

export default {
    template,

    inject: [
        'repositoryFactory',
        'ruleConditionsConfigApiService'
    ],

    props: {
        client: {
            required: true,
            type: Object,
        },
    },

    data() {
        return {
            isLoading: false,
        };
    },

    computed: {
        ruleRepository() {
            return this.repositoryFactory.create('heptacom_admin_open_auth_client_rule');
        },

        sortedRules() {
            return this.client.rules.sort((a, b) => a.position - b.position);
        },
    },


    created() {
        this.createdComponent().then();
    },

    methods: {
        async createdComponent() {
            this.isLoading = true;

            await this.loadConditionData();

            this.isLoading = false;
        },

        async loadConditionData() {
            await this.ruleConditionsConfigApiService.load();
        },

        addRule() {
            const rule = this.ruleRepository.create();
            rule.clientId = this.client.id;
            rule.position = this.client.rules.length;
            this.client.rules.add(rule);
        },

        moveRuleUp(rule) {
            this.swapRules(rule.position, rule.position - 1);
        },

        moveRuleDown(rule) {
            this.swapRules(rule.position, rule.position + 1);
        },

        deleteRule(rule) {
            this.client.rules.remove(rule.id);
        },

        swapRules(positionA, positionB) {
            let ruleA = null;
            let ruleB = null;

            for (const rule of this.client.rules) {
                if (ruleA === null && rule.position === positionA) {
                    ruleA = rule;
                    continue;
                }

                if (ruleB === null && rule.position === positionB) {
                    ruleB = rule;
                    continue;
                }
            }

            if (ruleA === null || ruleB === null) {
                return;
            }

            ruleA.position = positionB;
            ruleB.position = positionA;
        }
    }
}
