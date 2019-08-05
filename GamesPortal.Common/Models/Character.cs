using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GamesPortal.Core.Models
{
    public class GameCharacter
    {
        [Required]
        public string CharacterName { get; set; }
        [DataType(DataType.Text, ErrorMessage = "Name Not Provided")]
        public string Name { get; set; }
        public int CharacterId { get; set; }
        public List<Props> Properties { get; set; }
    }

    public class Props
    {
        [Required]
        public string Property { get; set; }
        public string Value { get; set; }
    }

    public class Character
    {
        [Column(TypeName = "int")]
        [Key]
        public int CharacterId { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string CharacterName { get; set; }


        [Column(TypeName = "nvarchar(max)")]
        public string CharacterDescription { get; set; }
        [Column(TypeName = "nvarchar(900)")]
        public string CreatedByUserId { get; set; }

    }

    public class UserCharacter
    {
        [Column(TypeName = "int")]
        [Key]
        public int UserCharacterId { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string CharacterType { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string CharacterName { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string CharacterDescription { get; set; }
        [Column(TypeName = "nvarchar(900)")]
        public string UserId { get; set; }

    }
}
