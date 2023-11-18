(this["webpackJsonpPluginksk-heptacom-admin-open-auth"]=this["webpackJsonpPluginksk-heptacom-admin-open-auth"]||[]).push([[4],{"5pXr":function(e,n,t){var i=t("lt30");i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,t("ydqr").default)("670a52b1",i,!0,{})},"LC+p":function(e,n,t){"use strict";t.r(n);t("5pXr");var i=Shopware,a=i.Context,o=i.Data,r=i.Mixin,s=o.Criteria;n.default={template:'{% block heptacom_admin_open_auth_client_listing_page %}\n    <sw-page class="heptacom-admin-open-auth-client-listing-page">\n        {% block heptacom_admin_open_auth_client_listing_page_inner %}\n        {% endblock %}\n\n        {% block heptacom_admin_open_auth_client_listing_page_search_bar %}\n            <template #search-bar>\n                <sw-search-bar\n                    :initialSearch="term"\n                    @search="onSearch"\n                    initialSearchType="heptacom_admin_open_auth_client"\n                ></sw-search-bar>\n            </template>\n        {% endblock %}\n\n        {% block heptacom_admin_open_auth_client_listing_page_search_bar_actions %}\n            <template #smart-bar-actions>\n                <sw-button\n                    v-if="acl.can(\'heptacom_admin_open_auth_client.creator\')"\n                    :routerLink="{ name: \'heptacom.admin.open.auth.client.create\' }"\n                    variant="primary"\n                >\n                    {{ $t(\'heptacom-admin-open-auth-client.pages.listing.actions.create\') }}\n                </sw-button>\n            </template>\n        {% endblock %}\n\n        {% block heptacom_admin_open_auth_client_listing_page_content %}\n            <template #content>\n                {% block heptacom_admin_open_auth_client_listing_page_content_entity_listing %}\n                    <sw-entity-listing\n                        v-if="items"\n                        :items="items"\n                        :repository="clientRepository"\n                        :showSelection="false"\n                        :columns="columns"\n                        :isLoading="!isLoading"\n                        :showActions="false"\n                    >\n                        {% block heptacom_admin_open_auth_client_listing_page_content_entity_listing_inner %}\n                        {% endblock %}\n\n                        {% block heptacom_admin_open_auth_client_listing_page_content_entity_listing_columns_active %}\n                            <template #column-active="{ item }">\n                                <sw-icon\n                                    :color="getLoginColor(item)"\n                                    name="regular-sign-in"\n                                    small\n                                ></sw-icon>\n                                <sw-icon\n                                    :color="getConnectColor(item)"\n                                    name="regular-share"\n                                    small\n                                ></sw-icon>\n                            </template>\n                        {% endblock %}\n\n                        {% block heptacom_admin_open_auth_client_listing_page_content_entity_listing_columns_created_at %}\n                            <template #column-createdAt="{ item }">\n                                {{ item.createdAt | date({ hour: \'2-digit\', minute: \'2-digit\' }) }}\n                            </template>\n                        {% endblock %}\n\n                        {% block heptacom_admin_open_auth_client_listing_page_content_entity_listing_columns_provider %}\n                            <template #column-provider="{ item }">\n                                {{ $te(\'heptacomAdminOpenAuthClient.providers.\' + item.provider + \'.label\') ? $t(\'heptacomAdminOpenAuthClient.providers.\' + item.provider + \'.label\') : item.provider }}\n                            </template>\n                        {% endblock %}\n\n                        {% block heptacom_admin_open_auth_client_listing_page_content_entity_listing_pagination %}\n                            <template #pagination>\n                                <sw-pagination\n                                    :page="page"\n                                    :limit="limit"\n                                    :total="total"\n                                    :total-visible="7"\n                                    @page-change="onPageChange"\n                                ></sw-pagination>\n                            </template>\n                        {% endblock %}\n                    </sw-entity-listing>\n                {% endblock %}\n            </template>\n        {% endblock %}\n\n        {% block heptacom_admin_open_auth_client_listing_page_sidebar_container %}\n            <template #sidebar>\n                {% block heptacom_admin_open_auth_client_listing_page_sidebar %}\n                    <sw-sidebar>\n                        {% block heptacom_admin_open_auth_client_listing_page_sidebar_inner %}\n                        {% endblock %}\n\n                        {% block heptacom_admin_open_auth_client_listing_page_sidebar_refresh %}\n                            <sw-sidebar-item\n                                :title="$tc(\'heptacom-admin-open-auth-client.pages.listing.actions.refresh\')"\n                                @click="onRefresh"\n                                icon="regular-undo"\n                            ></sw-sidebar-item>\n                        {% endblock %}\n                    </sw-sidebar>\n                {% endblock %}\n            </template>\n        {% endblock %}\n    </sw-page>\n{% endblock %}\n',inject:["acl","repositoryFactory"],mixins:[r.getByName("listing")],data:function(){return{isLoading:!0,items:null,columns:[{property:"active",label:this.$t("heptacom-admin-open-auth-client.pages.listing.columns.active"),allowResize:!1,width:"50px"},{property:"name",label:this.$t("heptacom-admin-open-auth-client.pages.listing.columns.name"),routerLink:"heptacom.admin.open.auth.client.edit"},{property:"provider",label:this.$t("heptacom-admin-open-auth-client.pages.listing.columns.provider")},{property:"userKeys.length",label:this.$t("heptacom-admin-open-auth-client.pages.listing.columns.users"),width:"100px"},{property:"createdAt",label:this.$t("heptacom-admin-open-auth-client.pages.listing.columns.createdAt"),width:"200px"}]}},created:function(){this.getList()},computed:{clientRepository:function(){return this.repositoryFactory.create("heptacom_admin_open_auth_client")},clientCriteria:function(){var e=new s,n=this.getMainListingParams();return e.addAssociation("userKeys"),e.setLimit(n.limit),e.setPage(n.page),e.addSorting(s.sort(n.sortBy||"name",n.sortDirection||"ASC")),n.term&&n.term.length&&e.addFilter(s.contains("name",n.term)),e}},methods:{getList:function(){return this.loadData()},loadData:function(){var e=this;this.isLoading=!0,this.loadClients().then((function(){e.isLoading=!1}))},loadClients:function(){var e=this;return this.items=null,this.clientRepository.search(this.clientCriteria,a.api).then((function(n){e.items=n}))},getLoginColor:function(e){return e.active?e.login?"#00cc00":"#cc0000":"#333333"},getConnectColor:function(e){return e.active?e.connect?"#00cc00":"#cc0000":"#333333"}}}},lt30:function(e,n,t){},ydqr:function(e,n,t){"use strict";function i(e,n){for(var t=[],i={},a=0;a<n.length;a++){var o=n[a],r=o[0],s={id:e+":"+a,css:o[1],media:o[2],sourceMap:o[3]};i[r]?i[r].parts.push(s):t.push(i[r]={id:r,parts:[s]})}return t}t.r(n),t.d(n,"default",(function(){return h}));var a="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!a)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var o={},r=a&&(document.head||document.getElementsByTagName("head")[0]),s=null,l=0,c=!1,p=function(){},d=null,m="data-vue-ssr-id",u="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(e,n,t,a){c=t,d=a||{};var r=i(e,n);return _(r),function(n){for(var t=[],a=0;a<r.length;a++){var s=r[a];(l=o[s.id]).refs--,t.push(l)}n?_(r=i(e,n)):r=[];for(a=0;a<t.length;a++){var l;if(0===(l=t[a]).refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete o[l.id]}}}}function _(e){for(var n=0;n<e.length;n++){var t=e[n],i=o[t.id];if(i){i.refs++;for(var a=0;a<i.parts.length;a++)i.parts[a](t.parts[a]);for(;a<t.parts.length;a++)i.parts.push(f(t.parts[a]));i.parts.length>t.parts.length&&(i.parts.length=t.parts.length)}else{var r=[];for(a=0;a<t.parts.length;a++)r.push(f(t.parts[a]));o[t.id]={id:t.id,refs:1,parts:r}}}}function g(){var e=document.createElement("style");return e.type="text/css",r.appendChild(e),e}function f(e){var n,t,i=document.querySelector("style["+m+'~="'+e.id+'"]');if(i){if(c)return p;i.parentNode.removeChild(i)}if(u){var a=l++;i=s||(s=g()),n=y.bind(null,i,a,!1),t=y.bind(null,i,a,!0)}else i=g(),n=k.bind(null,i),t=function(){i.parentNode.removeChild(i)};return n(e),function(i){if(i){if(i.css===e.css&&i.media===e.media&&i.sourceMap===e.sourceMap)return;n(e=i)}else t()}}var b,v=(b=[],function(e,n){return b[e]=n,b.filter(Boolean).join("\n")});function y(e,n,t,i){var a=t?"":i.css;if(e.styleSheet)e.styleSheet.cssText=v(n,a);else{var o=document.createTextNode(a),r=e.childNodes;r[n]&&e.removeChild(r[n]),r.length?e.insertBefore(o,r[n]):e.appendChild(o)}}function k(e,n){var t=n.css,i=n.media,a=n.sourceMap;if(i&&e.setAttribute("media",i),d.ssrId&&e.setAttribute(m,n.id),a&&(t+="\n/*# sourceURL="+a.sources[0]+" */",t+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}}]);