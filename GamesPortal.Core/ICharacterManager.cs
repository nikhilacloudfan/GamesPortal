using GamesPortal.Core.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GamesPortal.Core
{
    public interface ICharacterManager
    {
        Task<int> SaveCharacter(GameCharacter character, string userId);
        List<GameCharacter> GetAllCharacters();
        GameCharacter GetCharacter(int characterId);
        Task<int> SaveDesignedCharacter(GameCharacter character, string userId);
        List<GameCharacter> GetAllUserCharacters(string userId);
    }
}
