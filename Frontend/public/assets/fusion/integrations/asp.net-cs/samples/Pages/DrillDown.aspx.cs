<<<<<<< HEAD
﻿using System;
using FusionCharts.Charts;

public partial class DrillDown : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        RenderChart();
       
    }
    private void RenderChart()
    {
        //Create chart instance
        // charttype, chartID, width, height, data format, data

        Chart chart = new Chart("column2d", "first_chart", "900", "550", "jsonurl", "Handler/Handler.ashx");
        Literal1.Text = chart.Render();
    }
   
 
=======
﻿using System;
using FusionCharts.Charts;

public partial class DrillDown : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        RenderChart();
       
    }
    private void RenderChart()
    {
        //Create chart instance
        // charttype, chartID, width, height, data format, data

        Chart chart = new Chart("column2d", "first_chart", "900", "550", "jsonurl", "Handler/Handler.ashx");
        Literal1.Text = chart.Render();
    }
   
 
>>>>>>> 4260aa1346491aa16cc44c1087e8037d58fc14bd
}