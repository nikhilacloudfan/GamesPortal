using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GamesPortal.Core.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName = "nvarchar(150)")]
        [MaxLength(150)]
        public string FullName { get; set; }
        [Column(TypeName = "int")]
        public int MaxCharacterCount { get; set; }

    }
}
