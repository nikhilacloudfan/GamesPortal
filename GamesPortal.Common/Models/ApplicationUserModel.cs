using GamesPortal.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GamesPortal.Common.Models
{
    public class ApplicationUserModel
    {
        [Required]
        public string UserName { get; set; }

        [Required(ErrorMessage = "The email address is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [MinLength(5)]
        public string Password { get; set; }

        [Required(AllowEmptyStrings = true)]
        public string FullName { get; set; }
        [Required(AllowEmptyStrings = true)]
        public string Role { get; set; } = "";

        public List<GameCharacter> Characters { get; set; }
    }

}

