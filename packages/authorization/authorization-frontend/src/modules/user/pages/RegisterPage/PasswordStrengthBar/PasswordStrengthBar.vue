<template>
    <v-row align="center" justify="center">
        <v-col cols="1">
            <v-icon>mdi-security</v-icon>
        </v-col>
        <v-col cols="11">
            <v-progress-linear
                :model-value="strengthPercentage"
                :bg-color="`${getBarColor}`"
                :color="`${getBarColor}`"
            ></v-progress-linear>

        </v-col>
    </v-row>
</template>
  
<script>
export default {
    name: 'password-strength-bar',
    props: {
        password: {
            type: String,
            required: true,
        },
    },
    computed: {
        strengthPercentage() {
            return this.calculateStrengthPercentage();
        },
        getBarColor() {
            return this.calculateBarColor();
        },
    },
    methods: {
        hasUppercaseLetters(str) {
            return /[A-Z]/.test(str);
        },

        hasNumbers(str) {
            return /\d/.test(str);
        },

        hasSpecialCharacters(str) {
            return /[!@#$%^&*(),.?":{}|<>]/.test(str);
        },
        calculateStrengthPercentage() {
            const minLength = 8;
            const maxLength = 16;
            const passwordLength = this.password.length;
            let percentage = ((passwordLength - minLength) / (maxLength - minLength)) * 100;

            if (this.hasUppercaseLetters(this.password)) {
                percentage += 10;
            }

            if (this.hasNumbers(this.password)) {
                percentage += 10;
            }

            if (this.hasSpecialCharacters(this.password)) {
                percentage += 10;
            }

            return Math.max(0, Math.min(100, percentage));
        },
        calculateBarColor() {
            const strengthPercentage = this.strengthPercentage;
            if (strengthPercentage < 25) {
                return "red";
            } else if (strengthPercentage < 50) {
                return "yellow";
            } else if (strengthPercentage < 75) {
                return "green";
            } else {
                return "purple";
            }
        },
    },
};
</script>
  
<style>
    .password-strength-bar {
        width: 100%;
        height: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        overflow: hidden;
    }

    .bar {
        height: 100%;
    }

    .weak {
        background-color: #ff6666; 
    }

    .medium {
        background-color: #ffcc66; 
    }

    .strong {
        background-color: #66cc66; 
    }

    .very-strong {
        background-color: #00cc99; 
    }
</style>