using Microsoft.EntityFrameworkCore.Migrations;

namespace isracardCalculator2.Migrations
{
    public partial class InitialDbMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Expressions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Num1 = table.Column<double>(type: "float", nullable: false),
                    Num2 = table.Column<double>(type: "float", nullable: false),
                    Op = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Result = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expressions", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Expressions");
        }
    }
}
