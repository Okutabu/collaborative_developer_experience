import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAlertStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/admin`;

export const useAdminStore = defineStore({
    id: 'admin',
    state: () => ({
        stats: {},
        users: {},
        userClic: {},
        usersDotUsers: [],
        desc: false
    }),
    actions: {
        async getUsersDotUsers() {
            try {
                var res = await fetchWrapper.get(`${baseUrl}/users`);
                res = JSON.parse(JSON.stringify(res));
                this.usersDotUsers = res.users;
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getStats() {
            try {
                var res = await fetchWrapper.get(`${baseUrl}/users`);
                res = JSON.parse(JSON.stringify(res));
                this.usersDotUsers = res.users;
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUserProficiency(id) {
            try {
                var res = await fetchWrapper.get(`${import.meta.env.VITE_API_URL}/user/${id}/proficiency`);
                console.log(res);
                res = JSON.parse(JSON.stringify(res));
                this.userClic = res;
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUsers() {
            try {
                var res = await fetchWrapper.get(`${baseUrl}/users`);
                res = JSON.parse(JSON.stringify(res));
                this.users = res.users;
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUsersbyLastActivity() {
            try {
                var res = await fetchWrapper.get(`${baseUrl}/users/sort/lastInteraction`);
                res = JSON.parse(JSON.stringify(res));
                this.users = res.users;
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUsersbyLastActivityDesc() {
            try {
                var res = await fetchWrapper.get(`${baseUrl}/users/sort/lastInteraction/desc`);
                res = JSON.parse(JSON.stringify(res));
                this.users = res.users;
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUsersbyName() {
            try {
                var res = await fetchWrapper.get(`${baseUrl}/users/sort/name`);
                res = JSON.parse(JSON.stringify(res));
                this.users = res.users;
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUsersbyNameDesc() {
            try {
                var res = await fetchWrapper.get(`${baseUrl}/users/sort/name/desc`);
                res = JSON.parse(JSON.stringify(res));
                this.users = res.users;
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUsersbySurname() {
            try {
                var res = await fetchWrapper.get(`${baseUrl}/users/sort/surname`);
                res = JSON.parse(JSON.stringify(res));
                this.users = res.users;
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUsersbySurnameDesc() {
            try {
                var res = await fetchWrapper.get(`${baseUrl}/users/sort/surname/desc`);
                res = JSON.parse(JSON.stringify(res));
                this.users = res.users;
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        }
    }

});
