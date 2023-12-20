import java.util.ArrayList;
import java.util.List;

public class TestBD {

    public static void main(String[] args) {
        var url = "jdbc:mysql://localhost:3306/oradores?useSSL=false&useTimezone=true&serverTimezone=UTC";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(TestBD.class.getName()).log(Level.SEVERE, null, ex);
        }

        try {
            Connection conexion = DriverManager.getConnection(url, user:"root",password:"");
            Statement instruccion = conexion.createStatement();
            var sql = "SELECT * FROM oradores";
            ResultSet resultado = instruccion.executeQuery(sql);

            List<String> htmlOradores = new ArrayList<>();

            while (resultado.next()) {
                String nombreOradores = resultado.getString("nombre");
                String temaOradores = resultado.getString("tema");
                String textoOradores = resultado.getString("texto");
                String htmlOradores = "<div class=\"col-xxl-4 col-xl-4 col-md-4 col-sm-12 col-xs-12\">\n"
                        + "    <div class=\"card\">\n"
                        + "        <img src=\"./assets/img/" + resultado.getString("imagen") + "\" class=\"card-img-top\" alt=\"" + nombreOrador + "\">\n"
                        + "        <div class=\"card-body\">\n"
                        + "            <h5 class=\"java badge bg-warning text-dark\">" + temaOradores + "</h5>\n"
                        + "            <h3 class=\"card-title\">" + nombreOradores + "</h3>\n"
                        + "            <p class=\"card-text lh-lg pb-2\">" + textoOradores + "</p>\n"
                        + "        </div>\n"
                        + "    </div>\n"
                        + "</div>";

                htmlOradores.add(htmlOradores);
            }

            System.out.println("var oradoresHtml = [");
            for (String htmlOradores : htmlOradores) {
                System.out.println("    '" + htmlOradores.replace("'", "\\'") + "',");
            }
            System.out.println("];");

        } catch (SQLException ex) {
            Logger.getLogger(TestBD.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}

java TestBD > output.js
