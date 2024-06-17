<template>

    <div class="container">
        <div class="card">
            <div class="card-body">
    
                <router-link :to="{name: 'summary'}">
    
                    Go To Summary
                </router-link>
                This is a counter. Your count is {{ counterStore.state.count }}
            </div>
        
            <buttoncounter/>
    
    
        
        </div>
    
    </div>
    
    </template>
    <script setup>
    import { useCounterStore } from '@/stores/counter'
    import buttoncounter from '@/components/buttoncounter.vue'
    

    const counterStore = useCounterStore()
    
    
    
    </script>
    <style>
    
    </style>