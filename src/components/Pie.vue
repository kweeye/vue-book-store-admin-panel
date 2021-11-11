<script lang="js">
import Vue from 'vue'
import VueCharts from 'vue-chartjs'
Vue.component('piechart', {
	extends: VueChartJs.Pie,
	data: function () {
		return {
			datacollection: {
				labels: ['Pie 1', 'Pie 2', 'Pie 3', 'Pie 4', 'Pie 5'],
				datasets: [
					{
						backgroundColor: [ '#1E9600', '#99C802', '#FFF200', '#F89403',	'#FF0000' ],
						data: [1, 2, 3, 4, 5],
					},
				],
			},
			options: {
				responsive: true,
				legend: {
					display: true,
					position: 'right',
				},
  	 },
		}
	},
	mounted () {
		// this.chartData is created in the mixin
		this.renderChart(this.datacollection, this.options)
	}
})

var vm = new Vue({ 
	el: '.app',
})
</script>
