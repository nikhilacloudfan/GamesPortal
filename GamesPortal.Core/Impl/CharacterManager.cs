using GamesPortal.Core.Models;
using GamesPortal.DB;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GamesPortal.Core.Impl
{
    public class CharacterManager: ICharacterManager
    {
        private GamesPortalContext _context;
        public CharacterManager(GamesPortalContext context)
        {
            _context = context;
        }

        public List<GameCharacter> GetAllCharacters()
        {
            var gameCharacters = new List<GameCharacter>();
            var characters = _context.Characters.Select(m => m).ToList();
            gameCharacters.AddRange(characters.Select(m => MapToGameCharacter(m)));
            return gameCharacters;
        }

        public List<GameCharacter> GetAllUserCharacters(string userId)
        {
            var userCharacters = new List<GameCharacter>();
            var characters = _context.UserCharacters.Select(m => m).Where(m => m.UserId == userId).ToList();
            userCharacters.AddRange(characters.Select(m => MapToUserCharacter(m)));
            return userCharacters;
        }

        private GameCharacter MapToUserCharacter(UserCharacter m)
        {
            var result = JsonConvert.DeserializeObject<GameCharacter>(m.CharacterDescription);
            return result;
        }

        public GameCharacter GetCharacter(int characterId)
        {
            var character = _context.Characters.First(m => m.CharacterId == characterId);
            return MapToGameCharacter(character);
        }

        public async Task<int> SaveCharacter(GameCharacter character, string userId)
        {
            if (_context.Characters.Any(m => m.CharacterName == character.CharacterName))
                return 2;
            var characterDescription = JsonConvert.SerializeObject(character);
            var gameCharacter = new Character()
            {
                CharacterName = character.CharacterName,
                CharacterDescription = characterDescription,
                CreatedByUserId = userId
            };
            _context.Characters.Add(gameCharacter);
            var x = await _context.SaveChangesAsync();
            return x;
        }

        public async Task<int> SaveDesignedCharacter(GameCharacter character, string userId)
        {
            var userCharacter = _context.UserCharacters.FirstOrDefault(m => m.CharacterName == character.Name && m.UserId == userId);
            if (userCharacter != null){
                var response = JsonConvert.DeserializeObject<GameCharacter>(userCharacter.CharacterDescription);
                if (response.Properties?.FirstOrDefault(m => m?.Property == "Level")?.Value == character.Properties?.FirstOrDefault(m => m?.Property == "Level")?.Value)
                    return 2;
            }
            var characterDescription = JsonConvert.SerializeObject(character);
            var gameCharacter = new UserCharacter()
            {
                CharacterType = character.CharacterName,
                CharacterName = character.Name,
                CharacterDescription = characterDescription,
                UserId = userId
            };
            _context.UserCharacters.Add(gameCharacter);
            var result = await _context.SaveChangesAsync();
            return result;
        }

        private GameCharacter MapToGameCharacter(Character m)
        {
            var result = JsonConvert.DeserializeObject<GameCharacter>(m.CharacterDescription);
            result.CharacterId = m.CharacterId;
            return result;
        }
    }
}
