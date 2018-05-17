<script>
import { Doughnut, mixins } from 'vue-chartjs';

export default {
    extends: Doughnut,
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
