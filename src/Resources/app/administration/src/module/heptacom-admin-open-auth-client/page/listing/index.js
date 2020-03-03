import template from './heptacom-admin-open-auth-client-listing-page.html.twig';

const { Component, Context, Data, Mixin } = Shopware;
const { Criteria } = Data;

Component.register('heptacom-admin-open-auth-client-listing-page', {
    template,

    inject: [
        'repositoryFactory',
    ],

    mixins: [
        Mixin.getByName('listing')
    ],

    data() {
        return {
            isLoading: true,
            items: null,
            columns: [{
                property: 'name',
                label: this.$t('heptacom-admin-open-auth-client.pages.listing.columns.name'),
                routerLink: 'heptacom.admin.open.auth.client.edit'
            }, {
                property: 'provider',
                label: this.$t('heptacom-admin-open-auth-client.pages.listing.columns.provider')
            }, {
                property: 'createdAt',
                label: this.$t('heptacom-admin-open-auth-client.pages.listing.columns.createdAt'),
                width: '200px'
            }]
        }
    },

    created() {
        this.getList();
    },

    computed: {
        clientRepository() {
            return this.repositoryFactory.create('heptacom_admin_open_auth_client');
        },

        clientCriteria() {
            const result = new Criteria();
            const params = this.getListingParams();

            result.setLimit(params.limit);
            result.setPage(params.page);
            result.addSorting(Criteria.sort(params.sortBy || 'name', params.sortDirection || 'ASC'));

            if (params.term && params.term.length) {
                result.addFilter(Criteria.contains('name', params.term));
            }

            return result;
        }
    },

    methods: {
        getList() {
            return this.loadData();
        },

        loadData() {
            this.isLoading = true;

            this.loadClients().then(() => {
                this.isLoading = false;
            });
        },

        loadClients() {
            this.items = null;

            return this.clientRepository
                .search(this.clientCriteria, Context.api)
                .then(items => {
                    this.items = items;
                });
        }
    }
});
