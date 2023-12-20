import java.util.ArrayList;
import java.util.List;

public class TestBD {

    public static void main(String[] args) {
        var url = "jdbc:mysql://localhost:3306/oradores";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(TestBD.class.getName()).log(Level.SEVERE, null, ex);
        }

        try {
            Connection conexion = DriverManager.getConnection(url, "root@localhost");
            Statement instruccion = conexion.createStatement();
            var sql = "SELECT * FROM oradores";
            ResultSet resultado = instruccion.executeQuery(sql);

            List<String> htmlOradores = new ArrayList<>();

            while (resultado.next()) {
                String nombreOrador = resultado.getString("nombre");
                String temaOrador = resultado.getString("tema");
                String textoOrador = resultado.getString("texto");
                String htmlOrador = "<div class=\"col-xxl-4 col-xl-4 col-md-4 col-sm-12 col-xs-12\">\n"
                        + "    <div class=\"card\">\n"
                        + "        <img src=\"./assets/img/" + resultado.getString("imagen") + "\" class=\"card-img-top\" alt=\"" + nombreOrador + "\">\n"
                        + "        <div class=\"card-body\">\n"
                        + "            <h5 class=\"java badge bg-warning text-dark\">" + temaOrador + "</h5>\n"
                        + "            <h3 class=\"card-title\">" + nombreOrador + "</h3>\n"
                        + "            <p class=\"card-text lh-lg pb-2\">" + textoOrador + "</p>\n"
                        + "        </div>\n"
                        + "    </div>\n"
                        + "</div>";

                htmlOradores.add(htmlOrador);
            }

            System.out.println("var oradoresHtml = [");
            for (String htmlOrador : htmlOradores) {
                System.out.println("    '" + htmlOrador.replace("'", "\\'") + "',");
            }
            System.out.println("];");

        } catch (SQLException ex) {
            Logger.getLogger(TestBD.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}

