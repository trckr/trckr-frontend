<script>
import { Bar, mixins } from 'vue-chartjs';

export default {
    extends: Bar,
    mixins: [ mixins.reactiveProp ],
    props: [ 'chartData' ],
    mounted: function () {
        this.renderChart(
            this.chartData,
            { responsive: true, maintainAspectRatio: false }
        )
    }
}
</script>
