using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GamesPortal.Core;
using GamesPortal.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace GamesPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharacterController : ControllerBase
    {
        private ICharacterManager _characterManager;
        private UserManager<ApplicationUser> _userManager;

        public CharacterController(ICharacterManager characterManager, UserManager<ApplicationUser> userManager)
        {
            _characterManager = characterManager;
            _userManager = userManager;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        [Route("SaveCharacter")]
        public async Task<int> SaveCharacter(GameCharacter character)
        {
            if (ModelState.IsValid)
            {
                string userId = User.Claims.First(c => c.Type == "UserID").Value;

                var result = await _characterManager.SaveCharacter(character, userId);
                return result;
            }
            return 0;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Customer")]
        [Route("GetAllCharacters")]
        public List<GameCharacter> GetAllCharacters()
        {
            var result = _characterManager.GetAllCharacters();
            return result;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Customer")]
        [Route("GetCharacter/{characterId}")]
        public GameCharacter GetCharacter(int characterId)
        {
            var result = _characterManager.GetCharacter(characterId);
            return result;
        }

        [HttpPost]
        [Authorize(Roles = "Customer")]
        [Route("SaveDesignedCharacter")]
        public async Task<int> SaveDesignedCharacter(GameCharacter character)
        {
            if (ModelState.IsValid)
            {
                string userId = User.Claims.First(c => c.Type == "UserID").Value;

                var result = await _characterManager.SaveDesignedCharacter(character, userId);
                return result;
            }
            return 0;
        }

        [HttpGet]
        //[Authorize(Roles = "Admin,Customer")]
        [Route("GetAllUserCharacters")]
        public List<GameCharacter> GetAllUserCharacters()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;

            var result = _characterManager.GetAllUserCharacters(userId);
            return result;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("UpdateMaxCharacterCount/{count}")]
        public async Task<int> UpdateMaxCharacterCount(int count)
        {
            try
            {
                var users =  _userManager.Users.Select(m => m).ToList();
                foreach (var user in users)
                {
                    user.MaxCharacterCount = count;
                    await _userManager.UpdateAsync(user);
                }
                return 1;
            }
            catch (Exception)
            {
                return 0;
            }
        }

    }
}